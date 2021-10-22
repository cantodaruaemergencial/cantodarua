import Layout from '#/components/Layout';
import InitiativePage from '#/components/Pages/InitiativePage';
import InitiativeService from '#/services/InitiativesService';
import { Form } from '#/types/Forms';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const NewInitiative = () => {
    const [form, setForm] = useState<Form | null>(null);
  
    const [initiativeId, setInitiativeId] = useState<number | null>();
  
    const router = useRouter();

  
    useEffect(() => {
      const { iniciativaId } = router.query;
  
      const id = iniciativaId ? +iniciativaId[0] : null;
  
      InitiativeService.getInitiativeForm(id).then((formData) => {
        setForm(formData);
        setInitiativeId(id);
      });
    }, []);
  
    return (
      <Layout title="Cadastro - Canto da Rua">
        <InitiativePage
          form={form}
          initiativeId={initiativeId}
        />
      </Layout>
    );
  };
  
export default NewInitiative;