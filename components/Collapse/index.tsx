import { motion } from 'framer-motion'
import { CaretUp, CaretDown } from 'phosphor-react'
import React, { ReactNode } from 'react'
import useToggle from 'hooks/useToggle'

interface IProps {
  isOpen?: boolean
  label?: string
  children: ReactNode
}

const Collapse = ({ isOpen = false, label = '', children }: IProps) => {
  const [toggle, setToggle] = useToggle(isOpen)

  return (
    <>
      <div
        className="flex justify-between items-center py-6 cursor-pointer"
        onClick={() => setToggle()}
      >
        <p className="text-black text-xl font-medium">{label}</p>
        <div className="text-gray-400">
          {toggle ? <CaretUp size={16} /> : <CaretDown size={16} />}
        </div>
      </div>
      {toggle && (
        <motion.div
          initial={{ scaleY: 0, transformOrigin: 'top' }}
          animate={{ scaleY: 1, transformOrigin: 'top' }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}

export default Collapse
