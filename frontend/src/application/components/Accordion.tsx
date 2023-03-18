import React from 'react'
import MuiAccordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

const Accordion = ({ title, children, ...props }: { title: string, children: React.ReactNode }) => {
  return (
    <MuiAccordion {...props}><AccordionSummary
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      {title}
    </AccordionSummary>
      <AccordionDetails>
        {children}
      </AccordionDetails></MuiAccordion>
  )
}

export default Accordion;