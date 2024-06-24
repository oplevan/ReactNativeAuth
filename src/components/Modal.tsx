import {BlurView} from 'expo-blur';
import React, {ReactNode} from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type ModalProps = {
  visible: boolean;
  title: string;
  body: string | ReactNode;
  footer?: ReactNode;
  onCancel: () => void;
};

export default function Modal({
  visible,
  title,
  body,
  footer,
  onCancel,
}: ModalProps) {
  return (
    <RNModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <BlurView intensity={30} style={styles.blurContainer} tint="dark">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={onCancel} style={styles.closeButton}>
              <Icon name="close" size={25} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{title}</Text>
            {body && <Text style={styles.modalBody}>{body}</Text>}
            {footer && <View style={styles.modalFooter}>{footer}</View>}
          </View>
        </View>
      </BlurView>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 10,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalBody: {
    marginTop: 15,
    marginBottom: 20,
    lineHeight: 20,
    textAlign: 'center',
  },
  modalFooter: {},
});
