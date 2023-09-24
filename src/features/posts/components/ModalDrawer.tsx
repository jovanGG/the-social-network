import {
  useBreakpointValue,
  DrawerCloseButton,
  ModalCloseButton,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  ModalContent,
  ModalOverlay,
  DrawerBody,
  ModalBody,
  Drawer,
  Modal,
} from "@chakra-ui/react";
import { ReactElement, ReactNode, memo } from "react";

interface ModalDrawerProps {
  renderButton: ({ onOpen }: { onOpen: () => void }) => ReactElement;
  children: ReactNode;
}

const ModalDrawer: React.FC<ModalDrawerProps> = memo(
  ({ renderButton, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const isMobile = useBreakpointValue(
      { base: true, md: false },
      { ssr: false }
    );

    return (
      <>
        {renderButton({ onOpen })}

        {isMobile ? (
          <Drawer
            size="full"
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
          >
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
      </>
    );
  }
);

export default ModalDrawer;
