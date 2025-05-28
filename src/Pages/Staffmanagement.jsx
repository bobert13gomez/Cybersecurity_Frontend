import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox,
  Popconfirm,
  Space,
  message,
} from "antd";
import { addUser, deleteUser, getUser, updatedUser } from "../servives/StaffServices";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { activityPostLogs } from "../utils/ActivityLogs";
import { useSelector } from "react-redux";

const { Option } = Select;

const StaffPage = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [page,setpages]=useState(0)
const [addPermission,setAddpermission]=useState([
    { permission_type: "dashboard", can_view: false, can_edit: false, can_delete: false,can_manage: false },
    { permission_type: "staff", can_view: false, can_edit: false, can_delete: false,can_manage: false },
  ])
  const defaultPermissions =useMemo(()=>[
    { permission_type: "dashboard", can_view: false, can_edit: false, can_delete: false,can_manage: false },
    { permission_type: "staff", can_view: false, can_edit: false, can_delete: false,can_manage: false },
  ],[]) ;

  const fetchStaff = async (page=1,limit=5) => {
    setLoading(true);
    try {
      const res=await getUser(page,limit)
      
      setData(res.data.data);
      setpages(res.data.totalCount);
    } catch {
      message.error("Failed to fetch staff");
    }
    setLoading(false);
  };
const interValRef=useRef()
  useEffect(() => {
    fetchStaff();
    console.log("------")
   interValRef.current=setTimeout(() => {
      activityPostLogs("StaffPage_Landed")
   }, 3000);

   return()=> clearInterval(interValRef.current)
  }, []);

  const openModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
      setAddpermission(record?.permissions)
    } else {
      form.setFieldsValue({
        name: "",
        email: "",
        role: "user",
       
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const datas = await form.validateFields();
      if (editingRecord) {
      
        const update=await updatedUser({...datas,permission:addPermission},editingRecord.id)
        fetchStaff()
        toast.success("Staff updated");
      } else {
      
        console.log(datas)
        await addUser({...datas,permission:addPermission})
        fetchStaff()
        toast.success("Staff added successfully");
      }
      setIsModalOpen(false);
      setEditingRecord(null);
    } catch {
      message.error("Submit failed");
    }
  };

  const handleDelete = async (id) => {
    try {
       await deleteUser(id,false)
       fetchStaff()
      toast.success("Staff deleted");
    } catch {
      toast.error("Delete failed");
    }
  };
  const permission=useSelector((state)=>state.permission.data)
  const handlePermissionChange=(index, key, value)=>{
    try{
      if(!addPermission[index]){
      defaultPermissions[index][key]=value
        setAddpermission((prev)=>[...prev,defaultPermissions[index]])
        return
      }
      setAddpermission((prev)=>{
        let previous=[...prev]
        previous[index][key]=value
        return previous
      })

     
    }catch(err){
      console.log(err)
    }

  }
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Role", dataIndex: "role" },    {
      title: "Actions",
      render: (_, record) => (
        <Space>
         {permission?.permissions?.find((item)=>item.permission_type=="staff")?.can_edit&&<Button type="link" onClick={() => openModal(record)}>
            Edit
          </Button>} 
          {permission?.permissions?.find((item)=>item.permission_type=="staff")?.can_delete&&<Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>}
        </Space>
      ),
    },
  ];
const getPermission=(permissiontype,key)=>{
  const getData=addPermission?.find((item)=>item?.permission_type?.toLowerCase().includes(permissiontype))
  return getData||{}
}
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Staff Management</h1>
       {permission?.permissions?.find((item)=>item.permission_type=="staff")?.can_manage&&<Button type="primary" onClick={() => openModal()}>
          Add Staff
        </Button>} 
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 ,total:page,onChange:(page)=>fetchStaff(page)}}
      />

      <Modal
        title={editingRecord ? "Edit Staff" : "Add Staff"}
        open={isModalOpen}
        onCancel={() => {setIsModalOpen(false),form.resetFields(),setAddpermission([])}}
        onOk={handleSubmit}
        okText={editingRecord ? "Update" : "Add"}
      >
        <Form form={form} layout="vertical">
  <Form.Item
    name="name"
    label="Name"
    rules={[{ required: true, message: "Name is required" }]}
  >
    <Input placeholder="Enter name" />
  </Form.Item>

  <Form.Item
    name="email"
    label="Email"
    rules={[
      { required: true, message: "Email is required" },
      { type: "email", message: "Invalid email format" },
    ]}
  >
    <Input placeholder="Enter email" />
  </Form.Item>
  <Form.Item
  name="password"
  label="Password"
  rules={[{ required: editingRecord? false: true, message: "Password is required" }]}
>
  <Input.Password
    placeholder="Enter password"
    iconRender={(visible) =>
      visible ? <IoMdEye /> : <IoMdEyeOff />
    }
  />
</Form.Item>

  <Form.Item
    name="role"
    label="Role"
    rules={[{ required: true, message: "Role is required" }]}
  >
    <Select placeholder="Select role">
      <Option value="user">User</Option>
      <Option value="admin">Admin</Option>
    </Select>
  </Form.Item>

 
    <div>
      <h3 className="text-base font-semibold mb-2 mt-4">Permissions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {defaultPermissions.map((item, index) => {
          const Permission=getPermission(item.permission_type)
          return <div
            key={item.permission_type}
            className="border hover:border-blue-400 transition-all rounded-xl p-4 shadow-lg"
          >
            <p className="font-semibold mb-2 capitalize text-gray-700">
              {item.permission_type}
            </p>
            <div className="space-y-2">
              <Checkbox
                checked={Permission["can_view"]}
                onChange={(e) =>
                  handlePermissionChange(index, "can_view", e.target.checked)
                }
              >
                Can View
              </Checkbox>
              <Checkbox
                checked={Permission["can_manage"]}
                onChange={(e) =>
                  handlePermissionChange(index, "can_manage", e.target.checked)
                }
              >
                Can Add
              </Checkbox>
              <Checkbox
                                checked={Permission["can_edit"]}
                onChange={(e) =>
                  handlePermissionChange(index, "can_edit", e.target.checked)
                }
              >
                Can Edit
              </Checkbox>
              <Checkbox
                                checked={Permission["can_delete"]}
                onChange={(e) =>
                  handlePermissionChange(index, "can_delete", e.target.checked)
                }
              >
                Can Delete
              </Checkbox>
            </div>
          </div>
})}
      </div>
    </div>
 
</Form>

      </Modal>
    </div>
  );
};

export default StaffPage;
