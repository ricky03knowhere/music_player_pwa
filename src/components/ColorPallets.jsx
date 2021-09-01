import React from "react";
import { Col, FormGroup, Input, Label, Row } from "reactstrap";

export default function ColorPallets({ colorsValue }) {
  return (
    <div>
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label for="colorA" className="mb-2">
              Color A
            </Label>
            <Input
              type="color"
              name="colorA"
              id="colorA"
              defaultValue={colorsValue[0]}
              placeholder="colorA placeholder"
            />
          </FormGroup>
        </Col>
        <Col xs="6">
          <FormGroup>
            <Label for="colorB" className="mb-2">
              Color B
            </Label>
            <Input
              type="color"
              name="colorB"
              id="colorB"
              defaultValue={colorsValue[1]}
              placeholder="colorB placeholder"
            />
          </FormGroup>
        </Col>
      </Row>
    </div>
  );
}
