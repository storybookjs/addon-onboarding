import { styled } from "@storybook/theming";
import { motion } from "framer-motion";

export const SnippetWrapper = styled(motion.div)<{ active?: boolean }>`
  position: relative;
  padding-top: 12px;
  padding-bottom: 12px;
`;
