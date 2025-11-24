import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentProps {
  children: ReactNode;
}

export default function Content({ children }: ContentProps) {
  const router = useRouter();

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 3 }, mt: { xs: 2, sm: 3 } }}>
      <motion.main
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>
    </Box>
  );
}