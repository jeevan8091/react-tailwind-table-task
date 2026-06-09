import DeleteConfirmationModal from './UserTable/DeleteConfirmationModal';

const ProjectDeleteModal = ({ project, onClose, onConfirm }) => {
  if (!project) return null;

  return (
    <DeleteConfirmationModal
      user={{ id: project.id, name: project.name }}
      onCancel={onClose}
      onDelete={onConfirm}
      title="Delete Project?"
      message="Are you sure you want to delete this project?"
    />
  );
};

export default ProjectDeleteModal;
