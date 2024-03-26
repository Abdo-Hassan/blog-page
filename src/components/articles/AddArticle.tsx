import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArticleInputForm from './ArticleInputForm';

const AddArticle = () => {
  // validation to add a new article
  const addArticleSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: addArticleSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className='mt-10 sm:w-1/2 w-full sm:mx-auto mx-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1'>
      <ArticleInputForm label='Title' inputName='title' />
      <ArticleInputForm label='Author' inputName='author' />
      <ArticleInputForm label='Publication date.' inputName='date' />
    </div>
  );
};

export default AddArticle;
