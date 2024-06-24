import React, {createContext, useState, useContext, ReactNode} from 'react';
import Modal from '../components/Modal';

type ModalContextProps = {
  showModal: (
    title: string,
    body: string | ReactNode,
    footer?: ReactNode,
  ) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider = ({children}: {children: ReactNode}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    body: null as string | ReactNode,
    footer: null as ReactNode,
  });

  const showModal = (
    title: string,
    body: string | ReactNode,
    footer?: ReactNode,
  ) => {
    setModalContent({title, body, footer});
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <ModalContext.Provider value={{showModal, hideModal}}>
      {children}
      <Modal
        visible={modalVisible}
        title={modalContent.title}
        body={modalContent.body}
        footer={modalContent.footer}
        onCancel={hideModal}
      />
    </ModalContext.Provider>
  );
};
