import { useForm } from 'react-hook-form';
import { useUpdateContactMutation } from 'redux/contactSlice';
import {
  ModalWrap,
  FormWrap,
  Form,
  FormLabel,
  FormInput,
  FormButton,
} from './ModalForm.styled';

export const ModalForm = ({ id }) => {
  const { register, handleSubmit, resetField } = useForm();
  const [updateContact] = useUpdateContactMutation();

  const onSubmit = async contact => {
    await updateContact({ id, ...contact });

    resetField('name');
    resetField('number');
  };

  return (
    <ModalWrap>
      <FormWrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormLabel>
            Name
            <FormInput
              {...register('name')}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              autoComplete="off"
            />
          </FormLabel>
          <FormLabel>
            Number
            <FormInput
              {...register('number')}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              autoComplete="off"
            />
          </FormLabel>
          <FormButton type="submit">Edit</FormButton>
        </Form>
      </FormWrap>
    </ModalWrap>
  );
};
