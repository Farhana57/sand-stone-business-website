import { useLanguage } from '../../i18n/useLanguage.js'
import Modal from '../ui/Modal.jsx'
import OrderForm from './OrderForm.jsx'

/** "Request a quote" dialog — reuses the same OrderForm as the contact page. */
export function QuoteModal({ open, productId, onClose }) {
  const { t } = useLanguage()

  return (
    <Modal open={open} onClose={onClose} title={t('quote.title')} subtitle={t('quote.subtitle')}>
      {/* The key remounts the form so the material passed in is preselected. */}
      <OrderForm key={productId} initialProductId={productId} variant="modal" onDone={onClose} />
    </Modal>
  )
}

export default QuoteModal
