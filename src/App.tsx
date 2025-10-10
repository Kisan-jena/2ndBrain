import { FiEdit, FiPlus, FiTrash2, Icon } from '@/components/icons';
import { Button } from '@/components/ui/Button';

const App = () => {
  return (
    <div className="p-8 space-y-4 bg-gray-100 min-h-screen">
      <div className="flex items-center gap-4">
        {/* Method 1: Direct icon usage (current way) */}
        <Button
          variant="primary"
          size="md"
          icon={<FiPlus size={16} />}
          text="CONTENT"
          onClick={() => {
            console.log('primary click');
          }}
        />

        {/* Method 2: Using generic Icon component */}
        <Button
          variant="secondary"
          size="md"
          icon={<Icon icon={FiEdit} size={16} className="text-blue-600" />}
          text="EDIT"
          onClick={() => {
            console.log('secondary click');
          }}
        />

        {/* Method 3: Icon component with custom styling */}
        <Button
          variant="danger"
          size="md"
          icon={<Icon icon={FiTrash2} size={16} color="white" />}
          text="Delete"
          onClick={() => {
            console.log('danger click');
          }}
        />
      </div>
    </div>
  );
};

export default App;
