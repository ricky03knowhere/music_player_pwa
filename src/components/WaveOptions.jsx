import React from "react";
import waveType from "../statics/waveType";
import { FormGroup, Input, Label } from "reactstrap";

export default function WaveOptions() {
  return (
    <FormGroup className="mb-4">
      <Label for="waveType" className="mb-2">Visualizer Type</Label>
      <Input type="select" name="waveType" id="waveType">
        {waveType.map((value, i) => (
          <option
            key={i}
            defaultValue={value}
            selected={value === "flower" ? "selected" : ""}
          >
            {value}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
}
