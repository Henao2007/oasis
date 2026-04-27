import type { ClientLead } from '../../types/client'
import { Input } from '../ui/Input'

type LeadFormProps = {
  values: ClientLead
  errors: Partial<Record<keyof ClientLead, string>>
  onChange: (field: keyof ClientLead, value: string) => void
}

export function LeadForm({ values, errors, onChange }: LeadFormProps) {
  return (
    <section className="panel">
      <h2>Datos opcionales</h2>
      <p>Si quieres, puedes dejar tus datos antes de ir a WhatsApp.</p>

      <div className="form-grid">
        <div>
          <Input
            id="nombre"
            label="Nombre"
            value={values.nombre}
            onChange={(event) => onChange('nombre', event.target.value)}
          />
          {errors.nombre ? <p className="field__error">{errors.nombre}</p> : null}
        </div>

        <div>
          <Input
            id="correo"
            label="Correo"
            type="email"
            value={values.correo}
            onChange={(event) => onChange('correo', event.target.value)}
          />
          {errors.correo ? <p className="field__error">{errors.correo}</p> : null}
        </div>

        <div>
          <Input
            id="numero"
            label="Numero"
            value={values.numero}
            onChange={(event) => onChange('numero', event.target.value)}
          />
          {errors.numero ? <p className="field__error">{errors.numero}</p> : null}
        </div>
      </div>
    </section>
  )
}
