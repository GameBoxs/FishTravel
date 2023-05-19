import { motion } from 'framer-motion';
import * as Style from './GameEnterBtn.Styled';

const GameEnterBtn = ({ color, onClick }: any) => {
  return (
    <Style.GameEnterBtnWrapper color={color} onClick={onClick}>
      <motion.div
        className="container"
        whileHover={{ scale: 1.2, rotate: 90 }}
        whileTap={{ scale: 0.8, rotate: -90, borderRadius: '100%' }}
      />
    </Style.GameEnterBtnWrapper>
  );
};

export default GameEnterBtn;
