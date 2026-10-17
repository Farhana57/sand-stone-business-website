import { Home as HomeIcon } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'
import Button from '../components/ui/Button.jsx'
import PageHero from '../components/sections/PageHero.jsx'

export function NotFound() {
  const { t } = useLanguage()
  useDocumentTitle('meta.notFoundTitle')

  return (
    <>
      <PageHero
        image="/images/stone-chips.jpg"
        imageAlt={t('notFound.title')}
        eyebrow="404"
        title={t('notFound.title')}
        subtitle={t('notFound.body')}
      >
        <Button to="/" icon={HomeIcon}>
          {t('actions.backToHome')}
        </Button>
        <Button to="/products" variant="outline">
          {t('actions.viewAllProducts')}
        </Button>
      </PageHero>
    </>
  )
}

export default NotFound
