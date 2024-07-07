import { useToast, UseToastOptions } from "@chakra-ui/react";

type ToastStatus = 'success' | 'error' | 'warning' | 'info';

const useToastStatus = () => {
  const toast = useToast();

  const showToast = (status: ToastStatus, title: string) => {
    const options: UseToastOptions = {
      title: title,
      status: status,
      position: 'top-right',
      isClosable: true,
    };
    toast(options);
  };

  return showToast;
};

export default useToastStatus;
