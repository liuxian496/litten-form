import { expect, spyOn } from 'storybook/test';

import {
  setMethodNotFound,
  setValuesFirstParamNotArray,
  valuePathNotFoundEntry,
} from '../../components/form/entries';
import {
  getValueByPath,
  getValues,
  setHelpTextByPath,
  setValueByPath,
  setValues,
} from '../../components/form/formUtil';
import { FormStory } from '../nativeForm.stories';

const Test = () => {
  return <div>测试FormUtil的分支逻辑</div>;
};

export const FormUtilBranchTest: FormStory = {
  parameters: {
    controls: { hideNoControlsWarning: true },
  },
  render: () => <Test />,
  play: async ({ step }) => {
    const warnSpy = spyOn(console, 'warn').mockImplementation(() => {});

    try {
      await step(
        'In "getValues", When the field do not has "get" method, should return empty object',
        async () => {
          const values = getValues({
            name: {
              path: 'name',
            },
          });

          await expect(values).toEqual({});
        }
      );

      await step(
        'In "getValueByPath", When formRegister is undefined, should return undefined',
        async () => {
          const value = getValueByPath('name', {});

          await expect(value).toBeUndefined();
        }
      );

      await step(
        'In "getValueByPath", When form item do not has "get" method, should return undefined',
        async () => {
          const value = getValueByPath('name', {
            name: {
              path: 'name',
            },
          });
          await expect(value).toBeUndefined();
        }
      );

      await step(
        `In "setHelpTextByPath", When formRegister is undefined, should warn ${valuePathNotFoundEntry('name')}`,
        async () => {
          setHelpTextByPath('name', 'This is help text', {});

          await expect(warnSpy).toHaveBeenCalledWith(
            `[litten warning]: ${valuePathNotFoundEntry('name')}`
          );
        }
      );

      await step(
        `In "setValues", When first parameter is not array, should warn ${setValuesFirstParamNotArray()}`,
        async () => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          setValues({}, {});

          await expect(warnSpy).toHaveBeenCalledWith(
            `[litten warning]: ${setValuesFirstParamNotArray()}`
          );
        }
      );

      await step(
        `In "setValues", When formRegister do not have set method, should warn ${setMethodNotFound()}`,
        async () => {
          setValues(
            [
              {
                path: 'name',
                value: 'Tom',
              },
            ],
            {}
          );

          await expect(warnSpy).toHaveBeenCalledWith(
            `[litten warning]: ${setMethodNotFound()}`
          );
        }
      );

      await step(
        `In "setValueByPath", When formRegister is undefined, should warn ${valuePathNotFoundEntry('name')}`,
        async () => {
          setValueByPath('name', 'Tom', {});

          await expect(warnSpy).toHaveBeenCalledWith(
            `[litten warning]: ${valuePathNotFoundEntry('name')}`
          );
        }
      );

      await step(
        `In "setValueByPath", When formRegister do not have set method, should warn ${setMethodNotFound()}`,
        async () => {
          setValueByPath('name', 'Tom', {
            name: {
              path: 'name',
            },
          });

          await expect(warnSpy).toHaveBeenCalledWith(
            `[litten warning]: ${setMethodNotFound()}`
          );
        }
      );
    } finally {
      warnSpy.mockRestore();
    }
  },
};
