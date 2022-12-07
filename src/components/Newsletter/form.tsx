import { Button, FormControl, HStack, Input, useToast } from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"

type RegisterStatus = "success"|"error";

export default function NewsletterForm() {
  const toast = useToast()

  function validate(value: string) {
    let error
    if (!value) {
      error = 'Informe seu e-mail 🙃'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "E-mail inválido 😱"
    }
    return error
  }

  return (
    <Formik
       initialValues={{
         email: '',
       }}
       onSubmit={(values, {resetForm}) => {
        const JSONdata = JSON.stringify(values)
        const endpoint = '/api/newsletter'
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSONdata,
        }
        fetch(endpoint, options).then(response => {
          let title = "Ebook resgatado com sucesso! Verifique seu e-mail!";
          let status: RegisterStatus = "success";

          if (response.status !== 201) {
            title = "Erro interno. Tente novamente mais tarde.";
            status = "error";
          }

          toast({
            title,
            status,
            isClosable: true,
          })

          resetForm()
        })
       }}
     >
      {({ errors, touched, isValidating }) => (
        <Form>
          <HStack>
            <Field name='email' validate={validate}>
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <Input 
                    {...field} 
                    variant="filled" 
                    id='email' 
                    placeholder='Informe seu e-mail'
                    backgroundColor="gray.800"
                  />
                </FormControl>
              )}
            </Field>
            <Button 
                type="submit" 
                mt="4"
                mb="8"
                m="0 auto"
                colorScheme="yellow"
                variant="outline"
              >
                Enviar
            </Button>
          </HStack>
          {errors.email && touched.email && <div>{errors.email}</div>}
         </Form>
       )}
     </Formik>
  )
}
