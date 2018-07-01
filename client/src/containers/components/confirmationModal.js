import { Modal as AntModal } from 'antd';
import text from '../../const/text';

export function confirmationModal(props) {
  const defaultProps = {
    title: text.logout,
    content: text.confirmLogout,
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
