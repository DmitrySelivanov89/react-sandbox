import {FC, useState} from "react";

type ControlType = 'text' | 'number' | 'select' | 'checkbox';

export interface Param {
  id: number;
  name: string;
  type: ControlType;
  options?: string[];
}

interface ParamValue {
  paramId: number;
  value: string | number | boolean;
}

export interface Model {
  paramValues: ParamValue[];
  colors: string[];
}

interface ParamEditorProps {
  params: Param[];
  model: Model;
}

export const ParamEditor: FC<ParamEditorProps> = ({params, model}) => {
  const [paramValues, setParamValues] = useState<ParamValue[]>(model.paramValues);

  const handleParamChange = (paramId: number, value: string) => {
    setParamValues(prevValues => {
      return prevValues.map(param => param.paramId === paramId ? {...param, value} : param);
    });
  };

  const renderParamInput = (param: Param, value: string | number | boolean) => {
    switch (param.type) {
      case 'text':
        return (
          <input
            id={`param-${param.id}`}
            type="text"
            value={value as string}
            onChange={(e) => handleParamChange(param.id, e.target.value)}
          />
        );
      case 'checkbox':
        return (
          <input
            id={`param-${param.id}`}
            type="checkbox"
            checked={value as boolean}
            onChange={(e) => handleParamChange(param.id, e.target.value)}
          />
        );
      default:
        return (
          <input
            id={`param-${param.id}`}
            type="text"
            value={value as string}
            onChange={(e) => handleParamChange(param.id, e.target.value)}
          />
        );
    }
  };

  return (
    <div className="param-editor">
      {params.map(param => {
        const paramValue = paramValues.find(pv => pv.paramId === param.id)?.value || '';

        return (
          <div key={param.id} className="param-field">
            <label htmlFor={`param-${param.id}`}>{param.name}</label>
            {renderParamInput(param, paramValue)}
          </div>
        );
      })}

      <div className="param-values-list">
        <h3>Текущие значения параметров:</h3>
        <ul>
          {paramValues.map(param => {
            const paramName = params.find(p => p.id === param.paramId)?.name;
            return (
              <li key={param.paramId}>
                {paramName}: {param.value}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

