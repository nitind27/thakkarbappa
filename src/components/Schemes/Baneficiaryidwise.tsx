import { useLocale } from 'next-intl';
import Link from 'next/link'
import React from 'react'

const Baneficiaryidwise = ({ idx, yojnaname, yojnaid }: any) => {
    const localActive = useLocale();
  return (
    <div>
      <Link href={`/${localActive}/yojna/schemes/beneficiary/beneficiryidwise/${yojnaid}`} className="text-black hover:text-blue-700">
        {idx}. {yojnaname}{" "}
      </Link>
    </div>
  )
}

export default Baneficiaryidwise
