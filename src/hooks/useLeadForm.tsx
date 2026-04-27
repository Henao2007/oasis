import { useMemo, useState } from 'react'
import type { ClientLead } from '../types/client'
import { validateLeadForm } from '../utils/validators'

const initialValues: ClientLead = {
  correo: '',
  nombre: '',
  numero: '',
}

export function useLeadForm() {
  const [values, setValues] = useState<ClientLead>(initialValues)

  const errors = useMemo(() => validateLeadForm(values), [values])

  const updateField = (field: keyof ClientLead, value: string) => {
    setValues((currentValues) => ({ ...currentValues, [field]: value }))
  }

  return {
    errors,
    isComplete: Object.values(values).every(Boolean),
    updateField,
    values,
  }
}
