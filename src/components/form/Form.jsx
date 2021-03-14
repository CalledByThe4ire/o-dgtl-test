import { useFormik } from 'formik';
import * as Yup from 'yup';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import plural from 'plural-ru';
import classnames from 'classnames';

import { formatNumber } from '../../utils';
import styles from './Form.module.scss';

const MINIMUM_WAGE = 12792;

const mask = createNumberMask({
  prefix: '',
  suffix: ' ₽',
  thousandsSeparatorSymbol: ' ',
  allowNegative: false,
});

const Form = () => {
  const formik = useFormik({
    initialValues: {
      salary: '',
    },
    validationSchema: Yup.object({
      salary: Yup.string()
        .max(13, 'Превышено допустимое значение')
        .test(
          'test_number_greater_than_minimum_wage',
          `Зарплата не может быть меньше МРОТ (${formatNumber(
            MINIMUM_WAGE
          )} ${plural(MINIMUM_WAGE, 'рубль', 'рубля', 'рублей')})`,
          (value) => {
            return !(
              value && parseInt(value.split(' ').join('')) < MINIMUM_WAGE
            );
          }
        )
        .required('Поле обязательно для заполнения'),
    }),
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className={styles.Form} onSubmit={formik.handleSubmit}>
      <div className={styles.FormGroup}>
        <label className={styles.FormLabel} htmlFor="salary">
          Ваша зарплата в&nbsp;месяц
        </label>

        <MaskedInput
          mask={mask}
          className={classnames(styles.FormInput, {
            [styles.FormInputError]: formik.touched.salary && formik.errors.salary,
          })}
          id="salary"
          type="text"
          placeholder="Введите данные"
          maxLength="20"
          {...formik.getFieldProps('salary')}
        />
        {formik.touched.salary && formik.errors.salary ? (
          <div className={styles.FormInputErrorMessage}>{formik.errors.salary}</div>
        ) : null}

        <button className={styles.FormBtnText} type="button">
          Рассчитать
        </button>
      </div>

      <div className={styles.FormGroup}>
        <p className={styles.FormLabel}>Что уменьшаем?</p>
        <div className={styles.FormGroupBtnWrapper}>
          <button className={classnames(styles.FormGroupBtn, styles.FormGroupBtnActive)} type="button">
            Платеж
          </button>

          <button className={styles.FormGroupBtn} type="button" disabled>
            Срок
          </button>
        </div>
      </div>

      <button className={styles.FormBtn} type="submit">
        Добавить
      </button>
    </form>
  );
};

export default Form;
