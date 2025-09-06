import React, { useState } from 'react';
import { 
  View, 
  TextField, 
  TextArea, 
  Button, 
  Flex,
  Well 
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';

interface AddTaskFormProps {
  onSubmit?: (title: string, description?: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(title.trim(), description.trim() || undefined);
      }
      
      // Reset form
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Well>
      <View>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="size-200">
            <TextField
              label="Task Title"
              value={title}
              onChange={setTitle}
              placeholder="Enter task title..."
              isRequired
              maxLength={200}
            />
            
            <TextArea
              label="Description (optional)"
              value={description}
              onChange={setDescription}
              placeholder="Enter task description..."
              maxLength={1000}
            />
            
            <Button
              type="submit"
              variant="cta"
              isDisabled={!title.trim() || isLoading}
              alignSelf="start"
            >
              <Add />
              {isLoading ? 'Adding...' : 'Add Task'}
            </Button>
          </Flex>
        </form>
      </View>
    </Well>
  );
};

export default AddTaskForm;