import * as yup from "yup";

export const REGISTRO_SCHEMA = yup.object({
    name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
    lastname: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
    email: yup.string().matches(/^[a-zA-Z0-9._%+-ñáéíóúüÜ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñáéíóúüÜ]{2,}$/i, "El email no es válido").required("El email es requerido"),
    password: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, "La contraseña no es válida").required("La contraseña es requerida"),
    repassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden").required("La confirmación de contraseña es obligatoria"),
  });
  
  export const LOGIN_SCHEMA = yup.object({
    email: yup.string().matches(/^[a-zA-Z0-9._%+-ñáéíóúüÜ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñáéíóúüÜ]{2,}$/, "El email no es un formato válido").required("El email es requerido"),
    password: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, "La contraseña no es válida").required("La contraseña es requerida")
  });


  export const EDITUSER_SCHEMA = yup.object({
    name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos"),
    lastname: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos"),
    
    email: yup.string().matches(/^[a-zA-Z0-9._%+-ñáéíóúüÜ]+@[a-zA-Z0-9.-]+\.[a-zA-ZñáéíóúüÜ]{2,}$/i, "El email no es válido"),
    password: yup.string().matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/, "La contraseña no es válida"),
    repassword: yup.string().oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
  });

  export const MEMBER_SCHEMA = yup.object({
    name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
    lastname: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
    dni: yup
    .string()
    .matches(/^\d+$/, "El DNI debe contener solo números")
    .min(7, "El DNI debe tener al menos 7 dígitos")
    .max(8, "El DNI no puede tener más de 8 dígitos")
    .test('positive', 'El DNI no puede ser negativo', value => parseInt(value, 10) >= 0)
    .required("El DNI es requerido"),
    whatsapp: yup.string().matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/, { 
      message: "El número no es válido",
      excludeEmptyString: true,
      transform: (value, originalValue) => (originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue)
    }).required("El número de celular es requerido"),
    obraSocial: yup.string().matches(/^[A-Za-z0-9\s]+$/, 'Solo se permiten letras, números y espacios en blanco')
  })

  export const EDITMEMBER_SCHEMA = yup.object({
    name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
    lastname: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
    dni: yup
    .string()
    .matches(/^\d+$/, "El DNI debe contener solo números")
    .min(7, "El DNI debe tener al menos 7 dígitos")
    .max(8, "El DNI no puede tener más de 8 dígitos")
    .test('positive', 'El DNI no puede ser negativo', value => parseInt(value, 10) >= 0)
    .required("El DNI es requerido"),
    whatsapp: yup.string().matches(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/, { 
      message: "El número no es válido",
      excludeEmptyString: true,
      transform: (value, originalValue) => (originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue)
    }).required("El número de celular es requerido"),
    obraSocial: yup.string().matches(/^[A-Za-z0-9\s]+$/, 'Solo se permiten letras, números y espacios en blanco')
  })

  export const PROGRAM_SCHEMA = yup.object({
    name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
    price: yup.string().matches(/^\d+(\.\d{1,2})?$/, "Solo se admiten números y un máximo de 2 decimales").required("El monto es requerido"),
  })
  export const PROGRAMEDIT_SCHEMA = yup.object({
    name: yup.string().matches(/^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/, "Los nombres no son válidos").required("El nombre completo es requerido"),
    price: yup.string().matches(/^\d+(\.\d{1,2})?$/, "Solo se admiten números y un máximo de 2 decimales").required("El monto es requerido"),
  })

  export const REGISTERPAYMENT_SCHEMA = yup.object({
    //la fecha no puede ser mayor a la fecha actual
    fecha: yup.date()
    .transform((value, originalValue) => originalValue ? value : null)
    .max(new Date(), "La fecha no puede ser mayor a la fecha actual")
    .nullable()
    .required('Debe elegir una fecha'),
    //monto es un string pero que solo admite numeros y no puede ser menor a 0
    monto: yup.string().matches(/^\d+(\.\d{1,2})?$/, "Solo se admiten números y un máximo de 2 decimales").required("El monto es requerido"),
  })
