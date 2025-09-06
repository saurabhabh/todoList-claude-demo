import React, { useState } from 'react';
import { 
  View, 
  TextField, 
  TextArea, 
  Button, 
  Flex,
  Form,
  Text
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import Refresh from '@spectrum-icons/workflow/Refresh';
import CheckmarkCircle from '@spectrum-icons/workflow/CheckmarkCircle';

interface AddTaskFormProps {
  onSubmit?: (title: string, description?: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const validateTitle = (value: string) => {
    if (!value.trim()) {
      setTitleError('Task title is required');
      return false;
    }
    if (value.length > 200) {
      setTitleError('Title must be 200 characters or less');
      return false;
    }
    setTitleError('');
    return true;
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (titleError) {
      validateTitle(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateTitle(title)) {
      return;
    }

    setIsLoading(true);
    setShowSuccess(false);
    
    try {
      if (onSubmit) {
        await onSubmit(title.trim(), description.trim() || undefined);
      }
      
      // Show success state
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      
      // Reset form
      setTitle('');
      setDescription('');
      setTitleError('');
    } catch (error) {
      console.error('Error creating task:', error);
      setTitleError('Failed to create task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const taskSuggestions = [
    'Review project documentation',
    'Schedule team meeting',
    'Update website content',
    'Prepare presentation slides',
    'Send follow-up emails'
  ];

  const getRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * taskSuggestions.length);
    setTitle(taskSuggestions[randomIndex]);
    validateTitle(taskSuggestions[randomIndex]);
  };

  return (
    <View 
      backgroundColor="static-white"
      borderRadius="medium"
      padding="size-400"
      UNSAFE_style={{
        border: '1px solid #E5E7EB',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        background: 'linear-gradient(135deg, #FAFAFA 0%, #FFFFFF 100%)'
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Flex direction="column" gap="size-300">
          {/* Title Input */}
          <View>
            <TextField
              label="Task Title"
              value={title}
              onChange={handleTitleChange}
              onBlur={() => validateTitle(title)}
              placeholder="What needs to be done?"
              isRequired
              maxLength={200}
              validationState={titleError ? 'invalid' : 'valid'}
              errorMessage={titleError}
              UNSAFE_className="modern-input modern-focus"
            />
            
            {/* Character count */}
            <Flex justifyContent="space-between" alignItems="center" marginTop="size-100">
              <Text 
                UNSAFE_style={{ 
                  fontSize: '0.8rem', 
                  color: title.length > 180 ? '#F59E0B' : '#9CA3AF' 
                }}
              >
                {title.length}/200 characters
              </Text>
              
              {/* Random suggestion button */}
              <Button
                variant="secondary"
                onPress={getRandomSuggestion}
                UNSAFE_style={{
                  fontSize: '0.8rem',
                  padding: '6px 12px',
                  minHeight: '32px',
                  background: 'linear-gradient(135deg, #F3F4F6, #E5E7EB)',
                  border: '1px solid #D1D5DB',
                  borderRadius: '6px',
                  color: '#6366F1',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  ':hover': {
                    background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                    borderColor: '#A5B4FC',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 2px 8px rgba(99, 102, 241, 0.15)'
                  },
                  ':active': {
                    transform: 'translateY(0)',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Refresh size="XS" />
                Inspire me
              </Button>
            </Flex>
          </View>
          
          {/* Description Input */}
          <View>
            <TextArea
              label="Description (optional)"
              value={description}
              onChange={setDescription}
              placeholder="Add more details about this task..."
              maxLength={1000}
              height="size-1200"
              UNSAFE_className="modern-input modern-focus"
            />
            
            {description && (
              <Text 
                UNSAFE_style={{ 
                  fontSize: '0.8rem', 
                  color: description.length > 900 ? '#F59E0B' : '#9CA3AF',
                  marginTop: '4px'
                }}
              >
                {description.length}/1000 characters
              </Text>
            )}
          </View>
          
          {/* Submit Button */}
          <Flex justifyContent="space-between" alignItems="center">
            <View flex={1}>
              <Button
                type="submit"
                variant="cta"
                isDisabled={!title.trim() || isLoading || !!titleError}
                UNSAFE_style={{
                  background: showSuccess 
                    ? 'linear-gradient(90deg, #10B981, #059669)' 
                    : 'linear-gradient(90deg, #6366F1, #4F46E5)',
                  border: 'none',
                  fontWeight: '600',
                  transition: 'all 0.2s ease-in-out',
                  transform: isLoading ? 'scale(0.98)' : 'scale(1)',
                  minWidth: '140px'
                }}
              >
                {showSuccess ? (
                  <>
                    <CheckmarkCircle />
                    Added!
                  </>
                ) : isLoading ? (
                  'Adding...'
                ) : (
                  <>
                    <Add />
                    Add Task
                  </>
                )}
              </Button>
            </View>
            
            {/* Quick stats */}
            <View>
              <Text 
                UNSAFE_style={{ 
                  fontSize: '0.8rem', 
                  color: '#9CA3AF',
                  textAlign: 'right'
                }}
              >
                Press Enter to add
              </Text>
            </View>
          </Flex>
        </Flex>
      </Form>
    </View>
  );
};

export default AddTaskForm;