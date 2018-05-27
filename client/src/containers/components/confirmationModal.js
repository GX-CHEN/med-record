import { Modal as AntModal } from 'antd';

export function confirmationModal(props) {
  const defaultProps = {
    title: 'Confirm Delete',
    content: 'Are you sure to delete?',
    onOk: () => null,
    closable: true,
    iconType: '',
    okText: 'Yes',
    cancelText: 'No',
    className: 'confirm-delete-modal-wrapper',
    ...props
  };
  return AntModal.confirm(defaultProps);
}
