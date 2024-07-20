import React from "react";

const UserModal: React.FC = () => {
  const openModal = () => {
    const modal = document.getElementById("my_modal_2") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <>
      {/* Open the modal using the openModal function */}
      <button className="btn" onClick={openModal}>
        open modal
      </button>
      <dialog id="my_modal_2" className="modal ">
        <div className=" h-max modal-box">
          <table className="table ">
            {/* head */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Is Verified?</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{1}</th>
                <td>Jose Acebuche</td>
                <td>joseacebuche2@gmail.com</td>
                <td>Yes</td>
                <td>
                  <button className="btn btn-warning text-white shadow-md">Change</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button type="submit">close</button>
        </form>
      </dialog>
    </>
  );
};

export default UserModal;
