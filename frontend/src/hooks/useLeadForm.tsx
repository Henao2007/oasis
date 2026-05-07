import { useMemo, useState } from 'react'
import { createClientLead } from '../services/clientService'
import { HttpError } from '../services/httpClient'
import type { ClientLead } from '../types/client'
import { validateLeadForm } from '../utils/validators'

const initialValues: ClientLead = {
  correo: '',
  nombre: '',
  numero: '',
}

export function useLeadForm() {
  const [values, setValues] = useState<ClientLead>(initialValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const errors = useMemo(() => validateLeadForm(values), [values])
  const hasValues = Object.values(values).some((value) => value.trim() !== '')
  const hasFieldErrors = Object.keys(errors).length > 0

  const resetMessages = () => {
    setSubmitError('')
    setSubmitMessage('')
  }

  const updateField = (field: keyof ClientLead, value: string) => {
    resetMessages()
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
  }

  const submitLead = async () => {
    resetMessages()

    if (!hasValues) {
      setSubmitError('Ingresa al menos un dato antes de guardar.')
      return false
    }

    if (hasFieldErrors) {
      setSubmitError('Corrige los campos marcados antes de guardar.')
      return false
    }

    setIsSubmitting(true)

    try {
      await createClientLead(values)
      setSubmitMessage('Tus datos fueron guardados correctamente.')
      return true
    } catch (error) {
      if (error instanceof HttpError) {
        const normalizedMessage = error.message.toLowerCase()

        if (normalizedMessage.includes('correo')) {
          setSubmitError('Este correo ya existe.')
          return false
        }

        if (normalizedMessage.includes('numero')) {
          setSubmitError('Este numero ya existe.')
          return false
        }
      }

      setSubmitError('No se pudieron guardar tus datos. Intenta de nuevo.')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    errors,
    isComplete: Object.values(values).every(Boolean),
    isSubmitting,
    submitError,
    submitLead,
    submitMessage,
    updateField,
    values,
  }
}
