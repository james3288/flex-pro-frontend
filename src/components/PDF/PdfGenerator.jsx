import React, { useEffect, useState } from "react";
// import image1 from "../../../assets/img/team/hero-1.jpg";
import logo from "./../../../src/assets/img/logo-2.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";
import FormatDate from "../../others/FormatDate";

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

// Create styles
const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
    color: "red",
  },
  title2: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Oswald",
    color: "red",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Oswald",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  listItem: {
    marginLeft: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  signature: {
    marginLeft: 12,
    fontSize: 14,
    padding: 0,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  signature2: {
    marginLeft: 12,
    fontSize: 14,
    padding: 0,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },

  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "right",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});
const PdfGenerator = ({ user }) => {
  const [dateNow, setDateNow] = useState();

  useEffect(() => {
    setDateNow(new Date());
    console.log(user?.image);
  }, []);

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            {FormatDate(dateNow)}
          </Text>

          <Text style={styles.title}>FLEXPRO FITNESS GYM</Text>
          <Text style={styles.author}>MEMBERSHIP AGREEMENT /CONTRACT</Text>

          {user?.flex_pro_user?.aggrement?.map((agg) => (
            <Text key={agg.id} style={styles.listItem}>
              {`\u2022`} {agg?.agreement_desc}
            </Text>
          ))}
          <Text style={styles.text}></Text>
          <Text style={styles.title2}>LIABILTY WAIVER</Text>
          <Text style={styles.text}>
            I acknowledge that I am responsible for my own health and pyhsical
            condition. Also, I understand that my participation in this exercise
            program could cause injury based on performing these activities.
          </Text>
          <Text style={styles.text}>
            No fitness trainer or fellow members are liable for any accidental
            injuries in which I may incur in participating exercises.
          </Text>
          <Text style={styles.text}>
            I assume all risk connected to all programs and consent to
            participate. The Company, Management, Employees shall not be
            responsible for any claims, demands, losses, actions or legal
            proceedings due to or otherwise arising from death, injury loss,
            damage, or theft to a Members person or property attributable to,
            arising out of or otherwise in connection with the use by a member
            or any other member of any services, facilities, equipment of
            fitness gym.
          </Text>
          <Text style={styles.text}></Text>
          <Text style={styles.signature}>
            {user?.flex_pro_user?.name.toUpperCase()}
          </Text>
          <Text style={styles.signature2}>SIGNATURE OVER PRINTED NAME</Text>
          {/* <Text style={styles.subtitle} break>
            Capítulo II: Que trata de la primera salida que de su tierra hizo el
            ingenioso Don Quijote
          </Text> */}

          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default PdfGenerator;
