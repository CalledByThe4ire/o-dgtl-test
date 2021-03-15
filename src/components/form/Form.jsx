import React, { Children, useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import plural from 'plural-ru';
import classnames from 'classnames';

import {
  formatNumber,
  extractNumber,
  getEarlyPaymentsList,
  getListEnding,
} from '../../utils';
import { StoreContext, actions, createAction } from '../../reducer';
import styles from './Form.module.scss';

const MINIMUM_WAGE = 12792;

const rubles = ['рубль', 'рубля', 'рублей'];

const mask = createNumberMask({
  prefix: '',
  suffix: ' ₽',
  thousandsSeparatorSymbol: ' ',
  allowNegative: false,
});

const ModalForm = () => {
  const store = useContext(StoreContext);
  const dispatch = store.dispatch;
  const state = store.state;

  const handleClick = (event, values) => {
    const { salary } = values;

    if (salary) {
      dispatch(createAction(actions.ADD_SALARY, extractNumber(salary)));
    }
  };

  return (
    <Formik
      initialValues={{
        salary: '',
        payments: [],
      }}
      validationSchema={Yup.object({
        salary: Yup.string()
          .max(13, 'Превышено допустимое значение')
          .test(
            'test_number_greater_than_minimum_wage',
            `Зарплата не может быть меньше МРОТ (${formatNumber(
              MINIMUM_WAGE
            )} ${plural(MINIMUM_WAGE, ...rubles)})`,
            (value) => {
              return !(value && extractNumber(value) < MINIMUM_WAGE);
            }
          )
          .required('Поле обязательно для заполнения'),
      })}
      onSubmit={(values) => {
        const summary = {
          salary: extractNumber(values.salary),
          payments: values.payments.map((payment) => JSON.parse(payment)),
        };

        alert(JSON.stringify(summary, null, 2));
      }}
    >
      {(props) => {
        return (
          <Form className={styles.Form}>
            <div className={styles.FormGroup}>
              <label className={styles.FormLabel} htmlFor="salary">
                Ваша зарплата в&nbsp;месяц
              </label>

              <MaskedInput
                mask={mask}
                className={classnames(styles.FormInput, {
                  [styles.FormInputError]:
                    props.touched.salary && props.errors.salary,
                })}
                id="salary"
                type="text"
                name="salary"
                placeholder="Введите данные"
                maxLength="20"
                {...props.getFieldProps('salary')}
              />

              <ErrorMessage name="salary">
                {(msg) => (
                  <div className={styles.FormInputErrorMessage}>{msg}</div>
                )}
              </ErrorMessage>

              <button
                className={styles.FormBtnText}
                type="button"
                disabled={props.values.salary === '' || props.errors.salary}
                onClick={(event) => handleClick(event, props.values)}
              >
                Рассчитать
              </button>
            </div>

            {state.salary && (
              <div className={styles.FormGroup}>
                <p id="checkbox-group" className={styles.FormLabel}>
                  Итого можете внести в&nbsp;качестве досрочных:
                </p>
                <div role="group" aria-labelledby="checkbox-group">
                  {Children.toArray(
                    getEarlyPaymentsList(state.salary).map((payment, index) => {
                      return (
                        <>
                          <Field
                            type="checkbox"
                            id={`payment-${index + 1}`}
                            name="payments"
                            value={JSON.stringify({
                              [`${index + 1}`]: payment.toString(),
                            })}
                          />

                          <label htmlFor={`payment-${index + 1}`}>
                            {`${formatNumber(payment)} ${plural(
                              payment,
                              ...rubles
                            )} ${(index + 1) % 2 === 0 ? 'во' : 'в'} ${
                              index + 1
                            }-${getListEnding(index + 1)} год`}
                          </label>
                        </>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            <div className={styles.FormGroup}>
              <p className={styles.FormLabel}>Что уменьшаем?</p>
              <div className={styles.FormGroupBtnWrapper}>
                <button
                  className={classnames(
                    styles.FormGroupBtn,
                    styles.FormGroupBtnActive
                  )}
                  type="button"
                >
                  Платеж
                </button>

                <button className={styles.FormGroupBtn} type="button" disabled>
                  Срок
                </button>
              </div>
            </div>

            <button
              className={styles.FormBtn}
              type="submit"
              disabled={props.errors.salary}
            >
              Добавить
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ModalForm;
