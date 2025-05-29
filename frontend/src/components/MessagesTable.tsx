import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, markEventAsRead } from "../store/eventSlice";
import type { RootState } from "../store/store";
import { Container, Col, Table, Button } from "react-bootstrap";
import socket from "../socket";
import { IEvent } from "../types";

function MessagesTable() {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.event.events);

  useEffect(() => {
    socket.on("newEvent", (data: IEvent) => dispatch(addEvent(data)));

    return () => {
      socket.off("newEvent");
    };
  }, [dispatch]);

  const handleMarkAsRead = (id: string) => {
    socket.emit("markAsRead", { id });
    dispatch(markEventAsRead(id));
  };

  return (
    <Container>
      <Col md={12}>
        <div style={{ maxHeight: "80vh", overflowY: "auto" }}>
          <Table striped bordered hover className="mt-2">
            <thead>
              <tr>
                <th>#</th>
                <th>time</th>
                <th>event</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td>{item.timestamp}</td>
                  <td>{item.type}</td>
                  <td>
                    {!item.confirmed ? (
                      <Button size="sm" onClick={() => handleMarkAsRead(item.id)}>
                        Mark as Read
                      </Button>
                    ) : (
                      <Button size="sm" variant="success" disabled>
                        isRead
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </Container>
  );
}

export default MessagesTable;
