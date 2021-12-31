import React, { useEffect, useState } from "react"
import './style.css'

interface Props {
  value : number,
  onChange(v: number): any;
}

const WeightConverterInput: React.FC<Props> = ({ value, onChange }) => {
  const [weight, setWeight] = useState({ kg: value, lbs: parseFloat((value * 2.205).toFixed(2))})

  useEffect(() => onChange(weight.kg), [weight])

  const toFloat = (e: React.ChangeEvent<HTMLInputElement>) => parseFloat(parseFloat(e.currentTarget.value).toFixed(2))

  return (
    <div>
      <div className="input-container">
        <input id="weightInkg" type="number"
          value={weight.kg}
          size={6}
          onChange={(e) => setWeight({
            kg: toFloat(e),
            lbs: parseFloat((toFloat(e) * 2.205).toFixed(2))
          })}
        />
        <label className={!!weight.kg ? 'filled' : ''} htmlFor={'weightInkg'}>
          KG
        </label>
      </div>
      <div className="input-container" style={{marginLeft: '20px'}}>
        <input
          id="weightInLbs"
          type="number"
          size={6}
          value={weight.lbs}
          onChange={(e) => setWeight({
            lbs: toFloat(e),
            kg: parseFloat((toFloat(e) / 2.205).toFixed(2))
          })}
        />
        <label className={!!weight.kg ? 'filled' : ''} htmlFor={'weightInLbs'}>
          LBS
        </label>
      </div>
    </div>
  )
}

export default WeightConverterInput
