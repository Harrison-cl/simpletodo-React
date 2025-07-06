// src/components/BulkActions.tsx

interface BulkActionsProps {
  removeCompletedTodos: () => void; // Function to remove completed todos
}

const BulkActions = ({ removeCompletedTodos }: BulkActionsProps) => {

  return (
    <div className="bulk-actions">
      <button id="remove-selected" onClick={removeCompletedTodos}>Remove Completed</button>
    </div>
  );
};

export default BulkActions;