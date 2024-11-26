import { useEffect } from 'react';

type ToastProps = {
  message: string;
  type: 'SUCCESS' | 'ERROR';
  onClose: () => void;
};

const Toast = ({ type, message, onClose }: ToastProps) => {
  const styles =
    type === 'SUCCESS'
      ? 'fixed top-4 right-4 z-50 py-2 px-3 rounded-sm bg-green-600 text-white max-w-md'
      : 'fixed top-4 right-4 z-50 py-2 px-3 rounded-sm bg-red-600 text-white max-w-md';

  // Close toast after 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return (
    <div className={styles}>
      <div className="flex items-center justify-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
