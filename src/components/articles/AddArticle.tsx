import { useFormik } from 'formik';
import * as Yup from 'yup';
import ArticleInputForm from './ArticleInputForm';
import { IAddArticle } from '../../types/types';
// import { ApiRequest } from '../../utils/Api';
import Title from '../Title';
import { useLocation, useNavigate } from 'react-router-dom';
import { postAPI, putAPI } from '../../utils/Api';

const AddArticle = () => {
  const state = useLocation().state as IAddArticle;
  const edit = state?.edit;
  const navigate = useNavigate();

  // add new article
  const addArticle = async (data: IAddArticle) => {
    try {
      const res = await postAPI(data);
      const articleData = res.data;
      if (res.status === 201) {
        navigate('/');
      }
      return articleData;
    } catch (err) {
      console.log(err);
    }
  };

  // edit new article
  const editArticle = async (data: IAddArticle) => {
    try {
      const res = await putAPI(data);
      const articleData = res.data;
      if (res.status === 200) {
        navigate('/');
      }
      return articleData;
    } catch (err) {
      console.log(err);
    }
  };

  // POST: create a new article
  const addArticleSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    author: Yup.string().required('Required'),
    content: Yup.string().required('Required'),
  });

  // initial values of the inputs
  const formik = useFormik<IAddArticle>({
    initialValues: {
      id: edit ? state?.id : 0,
      title: edit ? state?.title : '',
      author: edit ? state?.author : '',
      content: edit ? state?.content : '',
    },
    validationSchema: addArticleSchema,
    onSubmit: async (values: IAddArticle) => {
      edit ? editArticle(values) : addArticle(values);
    },
  });

  const disableSubmission = () => {
    if (
      formik.isSubmitting ||
      !formik.values.title ||
      !formik.values.author ||
      !formik.values.content
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div>
      {/* Main title */}
      <Title title={edit ? 'Edit Article' : 'New Article'} />

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
            inputName='content'
            label='Content'
            value={formik.values.content}
          />
        </div>
        <div className='flex items-center justify-center'>
          <button
            disabled={!disableSubmission}
            className='m-auto w-1/2 mt-5 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'>
            {formik.isSubmitting
              ? 'Submitting...'
              : edit
              ? 'Save Article'
              : 'Add Article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddArticle;
