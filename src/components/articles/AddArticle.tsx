import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArticleInputForm from './ArticleInputForm';
import { IAddArticle } from '../../types/types';
import { ApiRequest } from '../../utils/Api';
import Title from '../Title';

const AddArticle = () => {
  const addNewArticle = async (data: IAddArticle) => {
    return await ApiRequest(
      'POST',
      'https://jsonplaceholder.typicode.com/posts',
      data
    ).then((res) => {
      console.log('ADD article', res.data);
    });
  };

  // POST: create a new article
  const addArticleSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
    publishedDate: Yup.string().required('Required'),
  });

  const formik = useFormik<IAddArticle>({
    initialValues: {
      title: '',
      author: '',
      content: '',
      publishedDate: '',
    },
    validationSchema: addArticleSchema,
    onSubmit: async (values: IAddArticle) => {
      await addNewArticle(values);
    },
  });

  return (
    <div>
      <Title title='New Article' />

      <form onSubmit={formik.handleSubmit}>
        <div className='sm:w-1/2 w-full sm:mx-auto mx-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1'>
          <ArticleInputForm
            formik={formik}
            label='Title'
            inputName='title'
            value={formik.values.title}
          />
          <ArticleInputForm
            formik={formik}
            label='Author'
            inputName='author'
            value={formik.values.author}
          />
          <ArticleInputForm
            formik={formik}
            inputName='publishedDate'
            label='Publication date.'
            value={formik.values.publishedDate}
          />
          <ArticleInputForm
            formik={formik}
            inputName='content'
            label='Content'
            value={formik.values.content}
          />
        </div>
        <div className='flex items-center justify-center'>
          <button
            disabled={formik.isSubmitting}
            className='m-auto w-1/2 mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
            {formik.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
