import json
from graphify.extract import collect_files, extract
from graphify.build import build_from_json
from graphify.cluster import cluster, score_all
from graphify.analyze import god_nodes, surprising_connections, suggest_questions
from graphify.report import generate
from graphify.export import to_json
from pathlib import Path

# AST extraction
code_files = []
detect = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8-sig'))
for f in detect.get('files', {}).get('code', []):
    p = Path(f)
    if p.is_dir():
        code_files.extend(collect_files(p))
    else:
        code_files.append(p)

if code_files:
    result = extract(code_files, cache_root=Path('.'))
    Path('graphify-out/.graphify_ast.json').write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8')
    print("AST: {} nodes, {} edges".format(len(result.get('nodes', [])), len(result.get('edges', []))))
else:
    Path('graphify-out/.graphify_ast.json').write_text(json.dumps({'nodes':[], 'edges':[], 'input_tokens':0, 'output_tokens':0}, ensure_ascii=False), encoding='utf-8')
    print("No code files - skipping AST extraction")

# Ensure semantic placeholder
sem_path = Path('graphify-out/.graphify_semantic.json')
if not sem_path.exists():
    sem_path.write_text(json.dumps({'nodes':[], 'edges':[], 'hyperedges':[], 'input_tokens':0, 'output_tokens':0}), encoding='utf-8')
    print("Wrote empty semantic placeholder.")
else:
    print("Semantic JSON already exists.")

# Merge AST + semantic
ast = json.loads(Path('graphify-out/.graphify_ast.json').read_text(encoding='utf-8'))
sem = json.loads(Path('graphify-out/.graphify_semantic.json').read_text(encoding='utf-8'))
seen = {n.get('id') for n in ast.get('nodes', [])}
merged_nodes = list(ast.get('nodes', []))
for n in sem.get('nodes', []):
    if n.get('id') not in seen:
        merged_nodes.append(n)
        seen.add(n.get('id'))
merged_edges = ast.get('edges', []) + sem.get('edges', [])
merged_hyperedges = sem.get('hyperedges', [])
merged = {
    'nodes': merged_nodes,
    'edges': merged_edges,
    'hyperedges': merged_hyperedges,
    'input_tokens': sem.get('input_tokens', 0),
    'output_tokens': sem.get('output_tokens', 0),
}
Path('graphify-out/.graphify_extract.json').write_text(json.dumps(merged, indent=2, ensure_ascii=False), encoding='utf-8')
print("Merged: {} nodes, {} edges ({} AST + {} semantic)".format(len(merged_nodes), len(merged_edges), len(ast.get('nodes', [])), len(sem.get('nodes', []))))

# Build, cluster, analyze, report
extraction = merged
detection = json.loads(Path('graphify-out/.graphify_detect.json').read_text(encoding='utf-8-sig'))
G = build_from_json(extraction)
communities = cluster(G)
cohesion = score_all(G, communities)
tokens = {'input': extraction.get('input_tokens', 0), 'output': extraction.get('output_tokens', 0)}
gods = god_nodes(G)
surprises = surprising_connections(G, communities)
labels = {cid: 'Community ' + str(cid) for cid in communities}
questions = suggest_questions(G, communities, labels)

report = generate(G, communities, cohesion, labels, gods, surprises, detection, tokens, '.', suggested_questions=questions)
Path('graphify-out/GRAPH_REPORT.md').write_text(report, encoding='utf-8')
to_json(G, communities, 'graphify-out/graph.json')

analysis = {
    'communities': {str(k): v for k, v in communities.items()},
    'cohesion': {str(k): v for k, v in cohesion.items()},
    'gods': gods,
    'surprises': surprises,
    'questions': questions,
}
Path('graphify-out/.graphify_analysis.json').write_text(json.dumps(analysis, indent=2, ensure_ascii=False), encoding='utf-8')
if G.number_of_nodes() == 0:
    print('ERROR: Graph is empty - extraction produced no nodes.')
    raise SystemExit(1)
print('Graph: {} nodes, {} edges, {} communities'.format(G.number_of_nodes(), G.number_of_edges(), len(communities)))
