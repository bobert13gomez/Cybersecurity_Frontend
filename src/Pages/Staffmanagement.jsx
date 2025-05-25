import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";

const { Option } = Select;

const initialData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
  },
];

const StaffPage = () => {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const openModal = (record = null) => {
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (editingRecord) {
        // Edit
        setData((prev) =>
          prev.map((item) =>
            item.id === editingRecord.id ? { ...item, ...values } : item
          )
        );
      } else {
        // Add
        const newId = Math.max(...data.map((d) => d.id), 0) + 1;
        setData([...data, { ...values, id: newId }]);
      }
      setIsModalOpen(false);
      setEditingRecord(null);
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Button type="link" onClick={() => openModal(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Staff Management</h1>
        <Button type="primary" onClick={() => openModal()}>
          Add Staff
        </Button>
      </div>

      <Table columns={columns} dataSource={data} rowKey="id" />

      <Modal
        title={editingRecord ? "Edit Staff" : "Add Staff"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter an email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Select placeholder="Select role">
              <Option value="user">User</Option>
              <Option value="admin">Admin</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StaffPage;
