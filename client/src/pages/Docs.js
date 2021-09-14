import matter from 'gray-matter';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import Markdown from '../components/Markdown';

// ----------------------------------------------------------------------

const MarkdownWrapperStyle = styled('div')(({ theme }) => ({
  '& h1': {
    marginBottom: theme.spacing(5)
  },
  '& h2': {
    marginBottom: theme.spacing(2)
  },
  '& h3, h4, h5, h6': {
    marginBottom: theme.spacing(2)
  },
  '& img': {
    margin: theme.spacing(5, 0),
    boxShadow: theme.customShadows.z8,
    borderRadius: theme.shape.borderRadius
  },
  '& p': {
    marginBottom: theme.spacing(2)
  },
  '& ul': {
    margin: theme.spacing(2, 0)
  },
  '& pre': {
    margin: theme.spacing(3, 0)
  }
}));

// ----------------------------------------------------------------------

export default function Docs() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [file, setFile] = useState('');

  useEffect(() => {
    const getFile = async () => {
      try {
        if (!pathname.startsWith('/docs')) {
          navigate('/404', { replace: true });
          return;
        }

        const response = await fetch(`/static${pathname}.md`, {
          headers: {
            accept: 'text/markdown'
          }
        });

        if (response.status !== 200) {
          navigate(response.status === 404 ? '/404' : '/500', { replace: true });
          return;
        }

        const data = await response.text();

        setFile(matter(data));
      } catch (err) {
        console.error(err);
        navigate('/500');
      }
    };

    getFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!file) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{`Docs: ${file.data.title} | Minimal-UI`}</title>
      </Helmet>

      <MarkdownWrapperStyle>
        <Markdown children={file.content} />
      </MarkdownWrapperStyle>
    </>
  );
}
