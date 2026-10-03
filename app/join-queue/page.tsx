"use client";

import { useState } from "react";
import { mockServices } from "../lib/mockData";
import { useQueue } from "../lib/QueueContext";

export default function JoinQueuePage() {
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const { queueEntry, joinQueue, leaveQueue } = useQueue();

  const selectedService = mockServices.find(
    (service) => service.id === selectedServiceId
  );

  function handleJoin() {
    if (!selectedService || !selectedService.isOpen) {
      return;
    }

    joinQueue(selectedService);
  }

  return (
    <main>
      <h1>Join Queue</h1>

      <p>Select a service to join.</p>

      <select
        value={selectedServiceId}
        onChange={(event) => setSelectedServiceId(event.target.value)}
      >
        <option value="">Select a service</option>

        {mockServices.map((service) => (
          <option
            key={service.id}
            value={service.id}
            disabled={!service.isOpen}
          >
            {service.name}
            {!service.isOpen ? " (Closed)" : ""}
          </option>
        ))}
      </select>

      {selectedService && (
        <div>
          <h2>{selectedService.name}</h2>

          <p>{selectedService.description}</p>

          <p>
            Estimated wait: {selectedService.estimatedWaitMinutes} minutes
          </p>

          <p>People in queue: {selectedService.queueLength}</p>

          <button
            onClick={handleJoin}
            disabled={!selectedService.isOpen}
          >
            Join Queue
          </button>
        </div>
      )}

      {queueEntry && (
        <div>
          <p>You are currently in a queue.</p>

          <button onClick={leaveQueue}>Leave Queue</button>
        </div>
      )}
    </main>
  );
}