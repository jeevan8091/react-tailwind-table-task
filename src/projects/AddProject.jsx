import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ProjectForm from './ProjectForm';
import { createProject, fetchProjects } from '../redux/thunk/projectThunk';

const AddProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await dispatch(
        createProject({
          name: data.name,
          shortCode: data.shortCode,
          projectDate: data.projectDate,
          status: data.status,
        })
      );
      toast.success('Project created successfully!');
      dispatch(fetchProjects());
      navigate('/projects');
    } catch (err) {
      toast.error(err?.message || 'Failed to create project.');
    }
  };

  return <ProjectForm mode="add" onSubmit={handleSubmit} />;
};

export default AddProject;
