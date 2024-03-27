import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {
  postArticles,
  updateArticles,
} from '../../redux/reducers/ArticleSlice';
import { IBlog } from '../../types/types';
import { addArticleAPI, updateArticleAPI } from '../../utils/Api';
import Title from '../Shared/Title';
import ArticleInputForm from './ArticleInputForm';

const AddArticle = () => {
  const state = useLocation().state as IBlog;
  const dispatch = useDispatch();
  const edit = state?.edit;
  const navigate = useNavigate();

  // add new article
  const addArticle = async (data: IBlog) => {
    try {
      const res = await addArticleAPI(data);
      const articleData = res.data;
      dispatch(postArticles(articleData));
      if (res.status === 201) {
        navigate('/');
      }
      return articleData;
    } catch (err) {
      throw new Error('Error with creating article');
    }
  };

  // edit new article
  const editArticle = async (data: IBlog) => {
    try {
      const res = await updateArticleAPI(data);
      const articleData = res.data;
      dispatch(updateArticles(articleData));
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
    body: Yup.string().required('Required'),
  });

  // initial values of the inputs
  const formik = useFormik<IBlog>({
    initialValues: {
      id: edit ? state?.id : 0,
      title: edit ? state?.title : '',
      author: edit ? state?.author : '',
      body: edit ? state?.body : '',
    },
    validationSchema: addArticleSchema,
    onSubmit: async (values: IBlog) => {
      edit ? editArticle(values) : addArticle(values);
    },
  });

  return (
    <div>
      {/* Main title */}
      <Title title={edit ? 'Edit Article' : 'New Article'} />

      <form onSubmit={formik.handleSubmit}>
        <div className='sm:w-1/2 w-full sm:mx-auto px-5 sm:px-0 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1'>
          <ArticleInputForm
            formik={formik}
            label='Title'
            inputName='title'
            value={formik.values.title}
          />

          {!edit && (
            <ArticleInputForm
              formik={formik}
              label='Author'
              inputName='author'
              value={formik.values.author}
            />
          )}

          <ArticleInputForm
            formik={formik}
            inputName='body'
            label='Content'
            value={formik.values.body}
          />
        </div>
        <div className='flex items-center justify-center'>
          <button
            disabled={
              formik.isSubmitting ||
              !formik.values.title ||
              !formik.values.author ||
              !formik.values.body
            }
            className='m-auto w-1/2 mt-5 disabled:bg-gray-300 disabled:cursor-not-allowed bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
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
