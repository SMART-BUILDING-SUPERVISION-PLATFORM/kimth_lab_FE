import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import useApi from "../../../hooks/api/axiosInterceptor";
import NoteItem from "./note";
import { PlusOutlined } from "@ant-design/icons";
import NoData from "../../../common/exceptionComponent/noData";
import Add from "./add";

const NoteContainer = styled.ul`
  width: 100%;
  height: calc(100% - 480.875px);
  flex-direction: column;
  align-items: center;
  overflow: ${({ isScrollBlocked }) => (isScrollBlocked ? "hidden" : "scroll")};
  position: relative;

  .new {
    position: fixed;
    left: 270px;
    top: 421px;
    width: 35px;
    height: 35px;
    border-radius: 5px;
    background-color: #1777ff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: white;
    cursor: pointer;
  }
`;

const Note = ({ projectId, noteType, userInfo }) => {
  const [notes, setNotes] = useState([
    {
      content: "",
      id: 0,
      replier: null,
      reply: "",
      type: { attr: "", value: "" },
      writer: {
        email: "",
        id: 0,
        name: "",
        pending: false,
        phone: "",
        role: { attr: "", value: "" },
      },
    },
  ]);

  const [newNote, setNewNote] = useState(false);
  const [isScrollBlocked, setIsScrollBlocked] = useState(false);

  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    (async () => {
      try {
        if (
          userInfo?.role?.attr === "COMPANY_ADMIN" ||
          userInfo?.role?.attr === "SERVICE_ADMIN"
        ) {
          const { data } = await useApi.get(`/api/note/admin/${projectId}`, {
            params: {
              type: noteType,
              new: false,
            },
          });

          setNotes(data);
        } else {
          const { data } = await useApi.get(`/api/note/user/${projectId}`, {
            params: {
              type: noteType,
              new: false,
            },
          });

          setNotes(data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [userInfo, noteType, newNote, isScrollBlocked]);

  useEffect(() => {
    setNewNote(false);
  }, [noteType]);

  useEffect(() => {
    console.log(newNote);
  }, [newNote]);

  return (
    <NoteContainer
      isScrollBlocked={isScrollBlocked}
      onScroll={(e) => {
        setScrollTop(e.target.scrollTop);
      }}
    >
      {notes.length === 0 ? (
        <NoData color="white" reload={false} />
      ) : (
        notes.map((note) => {
          return (
            <NoteItem
              note={note}
              setIsScrollBlocked={setIsScrollBlocked}
              noteType={noteType}
              projectId={projectId}
              scrollTop={scrollTop}
            />
          );
        })
      )}
      <div
        className="new"
        onClick={() => {
          setNewNote(true);
          setIsScrollBlocked(true);
        }}
      >
        <PlusOutlined />
      </div>
      {newNote && (
        <Add
          newNote={newNote}
          setNewNote={setNewNote}
          noteType={noteType}
          setIsScrollBlocked={setIsScrollBlocked}
          scrollTop={scrollTop}
        />
      )}
    </NoteContainer>
  );
};

export default Note;
