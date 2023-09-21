import {
  useBreakpointValue,
  DrawerCloseButton,
  ModalCloseButton,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  ModalContent,
  DrawerBody,
  ModalBody,
  Drawer,
  Modal,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";

interface ModalDrawerProps {
  renderButton: ({ onOpen }: { onOpen: () => void }) => ReactElement;
  children: ReactNode;
}

const ModalDrawer: React.FC<ModalDrawerProps> = ({
  renderButton,
  children,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <div>
      {renderButton({ onOpen })}

      {isMobile ? (
        <Drawer size="full" isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>{children}</DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      ) : (
        <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p={7}>{children}</ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default ModalDrawer;
