import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import More from "./more";

const NoteItemContainer = styled.li`
  width: 100%;
  height: 80px;
  margin-bottom: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5px 5px 0 5px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    height: 45px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 2px;
    margin: 0px;
    .name {
      width: 100%;
      font-size: 15px;
      font-weight: bold;
      color: black;
    }
    .summary {
      width: 100%;
      font-size: 15px;
      color: rgba(0, 0, 0, 0.6);
    }
  }

  .down {
    width: 100%;
    height: 31px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .isReplied {
      font-size: 15px;
      color: ${({ isReplied }) => (isReplied ? "green" : "red")};
    }

    .more {
      border-radius: 4px;
      width: 50px;
      height: 25px;
      background-color: #1777ff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      cursor: pointer;
    }
  }
`;

const NoteItem = ({
  note,
  setIsScrollBlocked,
  noteType,
  projectId,
  scrollTop,
}) => {
  const [more, setMore] = useState(false);
  const { content, writer, replier } = note;

  useEffect(() => {
    setMore(false);
  }, [noteType]);

  return (
    <>
      <NoteItemContainer isReplied={replier !== null}>
        <div className="up">
          <span className="name">{writer?.name}</span>
          <span className="summary">
            {content.length > 20 ? content.slice(0, 20) + "..." : content}
          </span>
        </div>
        <div className="down">
          <span className="isReplied">
            {replier === null ? "답변 대기중" : "답변 완료"}
          </span>
          <div
            className="more"
            onClick={() => {
              setMore(!more);
              setIsScrollBlocked(true);
            }}
          >
            <span>more</span>
          </div>
        </div>
      </NoteItemContainer>
      {more && (
        <More
          replier={replier}
          scrollTop={scrollTop}
          note={note}
          setIsScrollBlocked={setIsScrollBlocked}
          setMore={setMore}
          projectId={projectId}
        />
      )}
    </>
  );
};

export default NoteItem;
