import instance from "../others/axiosInstance";

const deleteUser = (id) => {
  instance
    .delete(`api/delete_user/${id}`)
    .then((response) => {
      console.log(`Deleted user with ID ${id}`);
      // Refresh the page
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
    });
};

export default deleteUser;
