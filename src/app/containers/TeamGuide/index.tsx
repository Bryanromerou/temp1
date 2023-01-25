/**
 *
 * TeamGuide
 *
 */

import React, { useState } from "react";
import GuideHeader from "app/components/GuideHeader";
import { Col, Row, Container, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { SectionType, ModuleInterface } from "app/components/Modules/types";
import { ModalType } from "./types";
import Section from "app/components/Modules/Section";
import Modal from "./Modal";
// import { useSelector, useDispatch } from 'react-redux';

// import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
// import { reducer, sliceKey } from './slice';
// import { selectTeamGuide } from './selectors';
// import { teamGuideSaga } from './saga';

interface Props {}

export default function TeamGuide(props: Props) {
  // useInjectReducer({ key: sliceKey, reducer: reducer });
  //   useInjectSaga({ key: sliceKey, saga: teamGuideSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const teamGuide = useSelector(selectTeamGuide);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const dispatch = useDispatch();

  // ------------------------ States ------------------------
  const [sections, setSections] = useState<{
    [sectionId: string]: SectionType;
  }>({});
  const [modalToShow, setModalToShow] = useState<ModalType>(null);
  const [currentSectionId, setCurrentSectionId] = useState(0);
  const [currentModuleId, setCurrentModuleId] = useState(0);
  const [toggle, setToggle] = useState(false);

  // Since some of the object are nested we need to call this function, since React only does a shallow comparison
  const forceRerender = () => {
    setToggle(!toggle);
  };

  const onAddSection = (
    title: string | false,
    modules: { [moduleId: string]: ModuleInterface },
    sectionId?: string | number
  ) => {
    const copy = { ...sections };
    addModuleCount(sectionId, Object.keys(modules).length);
    if (sectionId !== undefined) {
      copy[sectionId] = {
        ...copy[sectionId],
        title,
        modules
      };
    } else {
      copy[currentSectionId] = {
        id: currentSectionId,
        title,
        modules
      };
    }

    setSections(copy);
    setModalToShow(null);

    if (sectionId === undefined) {
      setCurrentSectionId(currentSectionId + 1);
    }
  };

  const onDeleteSection = sectionId => {
    const copy = { ...sections };
    delete copy[sectionId];
    setSections(copy);
    forceRerender();
  };

  const addModuleCount = (sectionId, moduleLength) => {
    let addedModules = 0;

    if (sectionId === undefined) {
      addedModules += moduleLength;
    } else {
      addedModules +=
        Object.keys(sections[sectionId].modules).length - moduleLength;
    }

    if (addedModules > 0) {
      setCurrentModuleId(currentModuleId + addedModules);
    }
  };

  const onHide = () => {
    setModalToShow(null);
  };

  const showModuleLibrary = () => {
    setModalToShow("AddSection");
  };

  const getAllSections = () =>
    Object.values(sections).map(({ modules, id, title }) => (
      <Row className="flex-nowrap">
        <Section
          modules={modules}
          onAddSection={onAddSection}
          sectionId={id}
          currentModuleId={currentModuleId}
          isCard
          activeTitle={title}
          onDeleteSection={onDeleteSection}
          key={id}
        />
      </Row>
    ));

  return (
    <Container fluid>
      {modalToShow !== null ? (
        <Modal
          onHide={onHide}
          modalToShow={modalToShow}
          onAddSection={onAddSection}
          currentModuleId={currentModuleId}
        />
      ) : null}

      <Row>
        <Col>
          <GuideHeader
            name="Talent Insights"
            type="team"
            description="The Talent Insight Team is dedicated to launching great “post-hire” products that leverage Criteria Corps strategic and business strenghths in the pre-hire space in an integrated set of post-hire tools."
          />
        </Col>
      </Row>
      <Row>
        <Col className="m-3" xs={8}>
          {getAllSections()}
          <Button
            onClick={showModuleLibrary}
            variant="outline-primary"
            className="w-100"
            style={{
              height: "80px"
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Section
          </Button>
        </Col>

        <Col className="m-3">
          <Row>
            <Card>
              <Col>
                <h2 className="section-title mt-3">Leader(s)</h2>
              </Col>
            </Card>
          </Row>
          <Row className="mb-3">
            <Card>
              <Col>
                <h2 className="section-title mt-3">Teams We Work With Most</h2>
              </Col>
            </Card>
          </Row>
          <Row>
            <Button
              variant="outline-primary"
              className="w-100"
              style={{
                height: "80px"
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Contact Info
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
