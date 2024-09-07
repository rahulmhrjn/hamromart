import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/user";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { MdOutlineDeleteForever } from "react-icons/md";

const AdminAllUsers = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const onlyUsers = users && users.filter((item) => item.role === "user");

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/user/delete-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });
    dispatch(getAllUsers());
  };

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 130,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 150,
      flex: 0.8,
    },
    {
      field: "joinedAt",
      headerName: "Joined Date",
      type: "text",
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: " ",
      flex: 0.4,
      minWidth: 30,
      headerName: "Remove",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <MdOutlineDeleteForever size={25} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  onlyUsers &&
    onlyUsers.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        email: item.email,
        joinedAt: item.createdAt.slice(0, 10),
      });
    });

  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Are you sure you want to delete?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] !rounded mr-12`}
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} text-white text-[18px] !h-[42px] !rounded ml-12`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  Confirm
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllUsers;
