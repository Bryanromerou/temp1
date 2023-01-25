import React from "react";
import { Modal as BootstrapModal, Container } from "react-bootstrap";
import { ModalType } from "./types";
import { ModuleInterface } from "app/components/Modules/types";
import Section from "app/components/Modules/Section";

interface Props {
  modalToShow: ModalType;
  onAddSection: (
    sectionTitle: string | false,
    modules: { [moduleId: string]: ModuleInterface },
    sectionId?: string | number
  ) => void;
  currentModuleId: number;
  onHide: () => void;
}

export default function Modal({
  modalToShow,
  onHide,
  onAddSection,
  currentModuleId
}: Props) {
  const getModalContent = () => {
    switch (modalToShow) {
      case "AddSection":
        return (
          <Section
            onAddSection={onAddSection}
            currentModuleId={currentModuleId}
            hideModal={onHide}
          />
        );
      default:
        return null;
    }
  };

  return (
    <BootstrapModal size={"xl"} onHide={onHide} show>
      <Container>{getModalContent()}</Container>
    </BootstrapModal>
  );
}
